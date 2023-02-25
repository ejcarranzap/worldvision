
IF OBJECT_ID('fn_seq_tbl_ad_user_access') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_user_access
IF OBJECT_ID('sp_tbl_ad_user_access') IS NOT NULL DROP PROCEDURE sp_tbl_ad_user_access
GO
CREATE FUNCTION fn_seq_tbl_ad_user_access()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_user_access),0)+1 FROM tbl_ad_user_access
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_user_access
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_user_access INT = NULL,
  @Id_location INT = NULL,
  @Id_user INT = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @date_mod DATETIME = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_user_access,
    A.Id_location,
    A.Id_user,
    A.user_mod,
    A.date_mod,
    A.active
    FROM tbl_ad_user_access A WHERE 1 = 1
    AND (COALESCE(@Id_user_access,A.Id_user_access) = A.Id_user_access OR @Id_user_access IS NULL)
    AND (COALESCE(@Id_location,A.Id_location) = A.Id_location OR @Id_location IS NULL)
    AND (COALESCE(@Id_user,A.Id_user) = A.Id_user OR @Id_user IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_user_access ON
      
      SET @Id_user_access = dbo.fn_seq_tbl_ad_user_access()
      INSERT INTO tbl_ad_user_access(
      Id_user_access,
      Id_location,
      Id_user,
      user_mod,
      date_mod,
      active
      )
      VALUES(
      @Id_user_access,
      @Id_location,
      @Id_user,
      @user_mod,
      @date_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_user_access A 
      WHERE A.Id_user_access = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_user_access OFF
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
    A.Id_location = @Id_location,
    A.Id_user = @Id_user,
    A.user_mod = @user_mod,
    A.date_mod = @date_mod,
    A.active = @active
    FROM tbl_ad_user_access A
    WHERE A.Id_user_access = @Id_user_access
    
    SELECT A.* FROM tbl_ad_user_access A 
    WHERE A.Id_user_access = @Id_user_access
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_user_access
    WHERE Id_user_access = @Id_user_access
    
    SELECT @Id_user_access Id_user_access
  END
  
SET NOCOUNT OFF
