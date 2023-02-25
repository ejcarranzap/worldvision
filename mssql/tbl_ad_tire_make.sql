
IF OBJECT_ID('fn_seq_tbl_ad_tire_make') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_tire_make
IF OBJECT_ID('sp_tbl_ad_tire_make') IS NOT NULL DROP PROCEDURE sp_tbl_ad_tire_make
GO
CREATE FUNCTION fn_seq_tbl_ad_tire_make()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_tire_make),0)+1 FROM tbl_ad_tire_make
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_tire_make
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_tire_make INT = NULL,
  @code NVARCHAR(20) = NULL,
  @name NVARCHAR(50) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_tire_make,
    A.code,
    A.name,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_tire_make A WHERE 1 = 1
    AND (COALESCE(@Id_tire_make,A.Id_tire_make) = A.Id_tire_make OR @Id_tire_make IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_tire_make ON
      
      SET @Id_tire_make = dbo.fn_seq_tbl_ad_tire_make()
      INSERT INTO tbl_ad_tire_make(
      Id_tire_make,
      code,
      name,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_tire_make,
      @code,
      @name,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_tire_make A 
      WHERE A.Id_tire_make = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_tire_make OFF
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
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_tire_make A
    WHERE A.Id_tire_make = @Id_tire_make
    
    SELECT A.* FROM tbl_ad_tire_make A 
    WHERE A.Id_tire_make = @Id_tire_make
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_tire_make
    WHERE Id_tire_make = @Id_tire_make
    
    SELECT @Id_tire_make Id_tire_make
  END
  
SET NOCOUNT OFF
