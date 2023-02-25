
IF OBJECT_ID('fn_seq_tbl_ad_supplier') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_supplier
IF OBJECT_ID('sp_tbl_ad_supplier') IS NOT NULL DROP PROCEDURE sp_tbl_ad_supplier
GO
CREATE FUNCTION fn_seq_tbl_ad_supplier()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_supplier),0)+1 FROM tbl_ad_supplier
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_supplier
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_supplier INT = NULL,
  @code NVARCHAR(20) = NULL,
  @name NVARCHAR(50) = NULL,
  @mobile NVARCHAR(50) = NULL,
  @email NVARCHAR(50) = NULL,
  @address NVARCHAR(255) = NULL,
  @contact NVARCHAR(50) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_supplier,
    A.code,
    A.name,
    A.mobile,
    A.email,
    A.address,
    A.contact,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_supplier A WHERE 1 = 1
    AND (COALESCE(@Id_supplier,A.Id_supplier) = A.Id_supplier OR @Id_supplier IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@mobile,A.mobile) = A.mobile OR @mobile IS NULL)
    AND (COALESCE(@email,A.email) = A.email OR @email IS NULL)
    AND (COALESCE(@address,A.address) = A.address OR @address IS NULL)
    AND (COALESCE(@contact,A.contact) = A.contact OR @contact IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_supplier ON
      
      SET @Id_supplier = dbo.fn_seq_tbl_ad_supplier()
      INSERT INTO tbl_ad_supplier(
      Id_supplier,
      code,
      name,
      mobile,
      email,
      address,
      contact,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_supplier,
      @code,
      @name,
      @mobile,
      @email,
      @address,
      @contact,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_supplier A 
      WHERE A.Id_supplier = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_supplier OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.code = @code,
    A.name = @name,
    A.mobile = @mobile,
    A.email = @email,
    A.address = @address,
    A.contact = @contact,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_supplier A
    WHERE A.Id_supplier = @Id_supplier
    
    SELECT A.* FROM tbl_ad_supplier A 
    WHERE A.Id_supplier = @Id_supplier
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_supplier
    WHERE Id_supplier = @Id_supplier
    
    SELECT @Id_supplier Id_supplier
  END
  
SET NOCOUNT OFF
